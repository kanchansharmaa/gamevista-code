  import React , {useState,useEffect} from 'react'
  import logo from '../assets/logo_gameit.png'
  import bg2 from '../assets/bg2.jpg'
  import './Subscription.css';
  import OtpInput from 'react-otp-input';
  import { useLocation,Link } from 'react-router-dom';
import {Vortex} from 'react-loader-spinner'
import {ToastContainer,toast} from 'react-toast'

import axios from 'axios';
  const Otp = () => {
    const hostname = window.location.hostname;
    const [otp, setOtp] = useState('');
    const location = useLocation();
    const [language,setLangauge]=useState('en')

    // New state variables to store number and requestId
    const [msisdn, setNumber] = useState(location.state?.number);
    const [requestId, setRequestId] = useState(location.state?.evinaRequestId);
  
  
  
    // useEffect(() => {

    //   setNumber(location.state?.number);
    //   setRequestId(location.state?.evinaRequestId);
  
    // }, []);
    // console.log("lcoation data=",number,requestId)

    const [loading, setLoading] = useState(false);
    const [scriptLoaded, setScriptLoaded] = useState(false); 

    const ENDPOINT_URL='https://betaksg.kncee.com/MSG/v1.1/API/GetScript'

    const url = '/validate'


    useEffect(() => {
      async function getScript() {
        setLoading(true);
    
        // const uuidv4 = () => {
        //   return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        //     const r = Math.random() * 16 | 0;
        //     const v = c === 'x' ? r : (r & 0x3 | 0x8);
        //     return v.toString(16);
        //   });
        // }
        try {
          console.log("id",requestId)
          // const evinaRequestId=uuidv4()
          // console.log('request id',evinaRequestId )
          const getScriptURL = `${ENDPOINT_URL}?applicationId=204&countryId=247&requestId=${requestId}`;
          console.log('script id',requestId )
          const response = await fetch(getScriptURL);
    
          if (!response.ok) {
            throw new Error(`Failed to fetch script: ${response.status} ${response.statusText}`);
          }
    
          const scriptContent = await response.json();
    
          console.log("response " + scriptContent[100]);
    
          if (scriptContent) {
            let top_head = document.getElementsByTagName("head")[0];
            let anti_script = document.createElement("script");
          
            anti_script.innerHTML = scriptContent[100];
            top_head.insertBefore(anti_script, top_head.firstChild);
          
            var event = new Event("DCBProtectRun");
          
            document.dispatchEvent(event);
            document.addEventListener("gateway-load", (event) => {
              setScriptLoaded(true);
              console.log(event, "EVENT LOADED");
          
              // Delay the setLoading(false) and loading message display
              setTimeout(() => {
                setLoading(false);
                // console.log("Loading completed.");
              }, 3000); // Adjust the delay time as needed
            });
          }
          
        } catch (error) {
          console.error("Error fetching script", error);
        } finally {
          setLoading(false);
        }
      }
    
      getScript();
    }, []);


    const handleSubmit = async () => {
      // console.log("payload data to be passed", number, requestId)
      try {
        const config = {
          headers: {
            'X-Hostname': hostname
          }
        };
    
        const response = await axios.post(url,{msisdn,requestId,otp,language},config);
        // console.log("url",url)
   
        console.log('Response:', response.data);

        const key=Object.keys(response.data.Response)
        let firstKey = key[0];
        let firstValue = response.data.Response[firstKey];
        // console.log("value", firstValue)
        
        if(response.data.status=='1'){
          window.location.href = "https://gamevista.gameit.in/";
        }
      } catch (error) {
        console.error('Error posting data:', error);
        
      }
    };
    

    const  handleClick=()=>{

      window.location.href = "https://www.google.com/";
    }   
  



    return (
      <div className="bg h-screen md:h-[1200px]" style={{ backgroundImage: `url(${bg2})` }}>
        <div>
      
        <nav className="bg-transparent border-gray-200 dark:bg-gray-900">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
              <a className="flex items-center space-x-3 rtl:space-x-reverse">
                <img src={logo} className="h-15 w-20" alt="Flowbite Logo" />
              </a>

              <div className="" id="navbar-default">
                <button type="button" class="text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:focus:ring-yellow-900 " onClick={()=>setLangauge('en')}>EN</button>

                <button type="button" className="text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:focus:ring-yellow-900 " onClick={()=>setLangauge('ar')} >AR</button>

              </div>
            </div>
          </nav>
            </div>
            <p className='text-center text-white font-bold'>{language=='en' ?"Free for 24 hours then AED 11/weekly, VAT Included":' مجانًا لمدة 24 ساعة بعد ذلك ، سيتم تحصيل 11 درهمًا إماراتيًا / أسبوعًا (شاملاً ضريبة القيمة المضافة.) '} </p>

         
        
            <div className='container mt-2 md:mt-1 mx-auto flex justify-center px-5'>

  <a class=" w-3/4 md:w-2/4   p-6  bg-transparent shadow-lg shadow-yellow-200    border border-gray-200 rounded-lg   ">

  <h5 class="text-xl font-bold tracking-tight text-white text-center dark:text-white">
    
    {language=='en' ? "Please enter the PIN received to activate your subscription":'الرجاء إدخال رقم التعريف الشخصي الذي تلقيته لتفعيل اشتراكك'}</h5>

<div className='flex justify-center mx-auto '>

  {loading ?    <Vortex
  visible={true}
  height="80"
  width="80"
  ariaLabel="vortex-loading"
  wrapperStyle={{}}
  wrapperClass="vortex-wrapper"
  colors={['#FACC15', '#F81DA2', '#FACC15', '#F81DA2', '#FACC15', '#F81DA2',]}
  />: <OtpInput
  value={otp}
  onChange={setOtp}
  inputStyle={{
    width: '2em', 
    height: '2em',
    fontSize: '1em',
    borderRadius: '4px',
    border: '2px solid blue',
    marginTop:'20px'
  }}
  numInputs={4}
  renderSeparator={<span className='mt-5'>-</span>}
  renderInput={(props) => <input {...props} />}
/>}

</div>



  <div className='mx-auto flex flex-row mt-3  gap-3 justify-center'>
  <button id='evina_ctabutton' type="submit" name='button' class="text-white  bg-[#FACC15]    rounded-lg text-sm font-medium  sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 " 
   onClick={()=>handleSubmit()}>{language=='en' ? 'Subscribe' : "إشترك"}</button>


     <button type="button" onClick={handleClick} class="text-white bg-red-700 hover:bg-red-800 rounded-lg text-sm font-medium sm:w-auto px-5 py-2 text-center dark:bg-red-600 dark:hover:bg-red-700">
          {language == 'en' ? "Exit" : "خروج"}
      </button>
    </div>


    <p className='text-sm mt-1  text-white text-center'>{language=='en'?"Free for 24 hours then AED 11/weekly, VAT Included":" مجانًا لمدة 24 ساعة بعد ذلك ، سيتم تحصيل 11 درهمًا إماراتيًا / أسبوعًا (شاملاً ضريبة القيمة المضافة.) "}</p>
    
    <p className='text-sm mt-1  text-white text-center'>{language=='en' ?'When clicking "Subscribe" we will activate your subscription.':'عند الضغط على "اشتراك" سنقوم بتفعيل اشتراكك.'} </p>
  
  </a>
  </div>

  <div className='mt-2 flex justify-center'>

<a  class="block max-w-3xl p-6  bg-transparent   dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">

  <h5 class=" text-center mt-[-10px] text-xl font-bold tracking-tight text-white dark:text-white">{language=='en'?"Terms & Conditions":"الشروط والأحكام:"}</h5>
  <p class="font-medium text-lg text-white dark:text-gray-400">{language=='en'?"By Subscribing to this Service, you have agreed to the following terms and conditions.":'من خلال النقر على زر الاشتراك أعلاه ، سوف توافق على الشروط والأحكام التالية'} </p>

  {language=='en'?      <ul class=" text-white text-sm list-disc  list-inside">
<li>
Free for 24 hours then, you will be charged 11 AED/week automatically. 
</li>
<li>
No commitment, you can cancel any time by sending C GVS to 1111.
</li>
<li>
For support, please contact: support@kncee.com
</li>
<li>
Free trial applicable only for first time subscriber. 
</li>
<li>
Enjoy your Free trial for 24 hours.
</li>
<li>
Please make sure that your browser is not using any 3rd-party blocking technologies and you have a healthy internet connection for swift access to the content.
</li>
<Link className='text-bold' to='/terms&conditions'> <p className='mt-2 text-white text-center'>For complete T&C click here {`>`} Privacy Policy</p></Link>
</ul>:
<div className='flex flex-col self-end'>
<ul class=" text-white  text-sm list-disc  list-inside">
<li>
مجانًا لمدة 24 ساعة بعد ذلك ، سيتم تحصيل 11 درهمًا إماراتيًا / أسبوعياً تلقائيًا.
</li>
<li>
لا يوجد التزام ، يمكنك الإلغاء في أي وقت بإرسالC GVS إلى 1111.
</li>
<li>
للحصول على الدعم ، يرجى الاتصال  support@kncee.com.
</li>
<li>
الفترة التجريبية المجانية تنطبق فقط على المشتركين لأول مرة.
</li>
<li>
استمتع بالفترة التجريبية المجانية لمدة 24 ساعة..
</li>
<li>
يرجى التأكد من أن متصفحك لا يستخدم أي تقنيات حظر تابعة لخدمات الطرف الثالث وأن لديك اتصال إنترنت صحي للوصول السريع إلى المحتوى 
</li>
<Link to="/terms&conditions">

<p className='mt-2 text-white text-center'>للحصول على الشروط والأحكام الكاملة انقر هنا. سياسة الخصوصية</p>
</Link>
</ul>
</div>
}


</a>

</div>
    
      </div>
    )
  }

  export default Otp
