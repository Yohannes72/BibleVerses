import '@styles/globals.css';
import Nav from '@component/Nav';
import Provider from '@component/Provider'
export const metadata = {
  title: 'BibleVerses',
  description: 'Create and share Bible Verses',
};

function RootLayout({ children }) { // Accept children as a prop
  return (
    <html lang="en">
      <body>
		<Provider>
        <div className="main">
          <div className="gradient" />
        </div>
        <main className="app">
			<Nav />
          {children} {/* Render children here */}
        </main>
		</Provider>
      </body>
    </html>
  );
}

export default RootLayout;
