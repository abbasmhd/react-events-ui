import '../public/static/bootstrap.css';
import 'toastr/build/toastr.min.css'
import "react-datepicker/dist/react-datepicker.css";
import '../public/static/site.css';

export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
