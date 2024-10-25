import 'bootstrap/dist/css/bootstrap.css';
import Header from '../components/header';
const AppComponent = ({ Component, pageProps, currentUser }) => {
  return (
    <div>
      <Header currentUser={currentUser}/>
      <Component {...pageProps} />
    </div>
  );
};

// AppComponent.getInitialProps = async () => {};

export default AppComponent;
