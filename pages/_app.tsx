import Layout from '@/components/layouts/Layout'
import '@/styles/globals.css'
import { Session, SessionKit, BrowserLocalStorage } from '@wharfkit/session'
import { WalletPluginAnchor } from '@wharfkit/wallet-plugin-anchor'
import { WalletPluginCloudWallet } from '@wharfkit/wallet-plugin-cloudwallet'
import { WebUIRenderer } from '@wharfkit/web-ui-renderer'
import type { AppProps } from 'next/app'
import { Dispatch, SetStateAction, createContext, useEffect, useState } from 'react'

/**
 * Errors - 
 * 
 * - when wcw and anchor plugin both are used, when trying to log in 
 * the second time, It always tries to open wcw
 * 
 * - some errors are not being caught by the sdk
 * 
 * - storage in sessionKit should be optional as per docs but is required
 * in interface
 */


export interface SessionContextProps {
  sessionKit?: SessionKit,
  session?: Session,
  setSession: Dispatch<SetStateAction<Session | undefined>>
}

/**
 * Wharf Session Context
 */
export const SessionContext = createContext<SessionContextProps | null>(null)

export default function App({ Component, pageProps }: AppProps) {
  const [session, setSession] = useState<Session>()
  const [sessionKit, setSessionKit] = useState<SessionKit>()

  useEffect(() => {
    const ui = new WebUIRenderer()
    ui.appendDialogElement();
    const anchor = new WalletPluginAnchor()
    const wax = new WalletPluginCloudWallet()
    const browserLocalStorage = new BrowserLocalStorage('wharf-session')

    const sessionKit = new SessionKit({
      appName: 'Next Wharf Demo',
      chains: [
        {
          id: "1064487b3cd1a897ce03ae5b6a865651747e2e152090f99c1d19d44e01aea5a4",
          url: "https://wax.greymass.com",
        },
      ],
      ui,
      walletPlugins: [wax, anchor],
      /**
       * this should be optional but is not in the SDK
       */
      storage: browserLocalStorage
    })

    setSessionKit(sessionKit)
  }, [])

  useEffect(() => {
    if (!sessionKit) {
      return;
    }

    if (!sessionKit.storage) {
      return;
    }

    if (session) {
      return;
    }

    const handleAutoLogin = async () => {
      const session = await sessionKit.restore();
      setSession(session)
    }

    handleAutoLogin();
  }, [sessionKit, session])

  return (
    <SessionContext.Provider
      value={{
        sessionKit,
        session,
        setSession
      }}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionContext.Provider>
  )
}
