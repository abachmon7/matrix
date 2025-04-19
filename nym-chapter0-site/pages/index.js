import { useEffect, useState } from 'react';
import { Connection } from '@solana/web3.js';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useWallet, ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import '../styles/globals.css';

const wallets = [new PhantomWalletAdapter()];

const ChapterText = `Alicia voló sobre la azotea del edificio y se posó...\n\n...¿qué ocurrió con Nym?`;

function Typewriter({ text }) {
  const [displayedText, setDisplayedText] = useState('');
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setDisplayedText((prev) => prev + text[index]);
      index++;
      if (index >= text.length) clearInterval(interval);
    }, 20);
    return () => clearInterval(interval);
  }, [text]);

  return <p className="whitespace-pre-wrap text-gray-100 text-lg font-mono leading-relaxed">{displayedText}</p>;
}

function HomePage() {
  const connection = new Connection('https://api.mainnet-beta.solana.com');
  const wallet = useWallet();

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <Head>
        <title>NYM: Capítulo 0</title>
      </Head>

      <header className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold">El Cuervo en el Campo de Maíz</h1>
        <WalletMultiButton className="!bg-white !text-black" />
      </header>

      <section className="max-w-4xl mx-auto">
        <h2 className="text-xl font-semibold mb-6">Capítulo 0: ¿Qué ocurrió con Nym?</h2>
        <Typewriter text={ChapterText} />
      </section>

      <footer className="mt-20 text-center text-gray-400 text-sm">
        © 2025 Daniel Cassà Soriano • NYM Token • Mint: NYMZrPwuhqWLBv5et9FECfoAbbRoqYB12wjnLcMWDbN
      </footer>
    </div>
  );
}

function App({ Component, pageProps }) {
  return (
    <ConnectionProvider endpoint="https://api.mainnet-beta.solana.com">
      <WalletProvider wallets={wallets} autoConnect>
        <Component {...pageProps} />
      </WalletProvider>
    </ConnectionProvider>
  );
}

export default dynamic(() => Promise.resolve(App), { ssr: false });
export { HomePage as default };
