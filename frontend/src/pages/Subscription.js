import React, { useState } from 'react'
import bg2 from '../assets/bg2.jpg'
import './Subscription.css';
import logo from '../assets/logo_gameit.png'
import axios from 'axios'
import {Link, useNavigate} from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Subscription = () => {
  const url = '/subscription'
  const [number, setNumber] = useState('')
  const [language,setLanguage]=useState('en')
 
  const [error,setError]=useState('')
   const navigate=useNavigate()
   const evinaRequestId = uuidv4();
  const hostname = window.location.hostname;
    // console.log("hostname",hostname)
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
 
      const config = {
        headers: {
          'X-Hostname': hostname
        }
      };

      // {"100":"Your request has been processed successfully"}

      const response = await axios.post(url, { msisdn: number,requestId:evinaRequestId,lang:language }, config);
        console.log("data", response.data)
      
      
      const key=Object.keys(response.data.Response)
      let firstKey = key[0];
      let firstValue = response.data.Response[firstKey];
      // console.log("value", firstValue)

       if(key[0]=='3'){
        toast.error(firstValue, {
          position: toast.POSITION.TOP_RIGHT,
        });
       
      
       }

      if(key[0]=='100'){
        toast.success(firstValue, {
          position: toast.POSITION.TOP_RIGHT,
        });
        navigate('/otp-validation', { state: { number ,evinaRequestId} });
      }
      else{
        navigate('/')
        setNumber('')
      }

    } catch (error) {
      console.error('Error making post request:', error);

    }
  };

  
  const  handleClick=()=>{

    window.location.href = "https://www.google.com/";
  }   


  return (
    <div className="bg h-[1200px] md:h-auto" style={{ backgroundImage: `url(${bg2})` }}>

    <div>


      <nav class="bg-transparent border-gray-200 dark:bg-gray-900">
        <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a class="flex items-center space-x-3 rtl:space-x-reverse">
            <img src={logo} class="h-10 w-30" alt="Flowbite Logo" />
          </a>

          <div class="   " id="navbar-default">
            <button type="button" class="text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:focus:ring-yellow-900 " onClick={() => setLanguage('en')}>EN</button>

            <button type="button" class="text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:focus:ring-yellow-900 " onClick={() => setLanguage('ar')}>AR</button>

          </div>
        </div>
      </nav>

    </div>

    
    <p className='text-center text-white font-bold'>{language=='en' ?"Free for 24 hours then AED 11/weekly, VAT Included":' مجانًا لمدة 24 ساعة بعد ذلك ، سيتم تحصيل 11 درهمًا إماراتيًا / أسبوعًا (شاملاً ضريبة القيمة المضافة.) '} </p>
    <div className='md:py-[2px] py-[20px] px-5 md:px-0'>

 
      <form onSubmit={handleSubmit} class="max-w-lg h-[320px] md:h-[250px] mx-auto bg-transparent shadow-lg shadow-yellow-200  border  p-5 rounded-lg ">
        <h1 className='text-white font-bold text-xl md:text-3xl text-center'>{language == 'en' ? "Subscribe Gamevista To Enjoy !" : "اشترك لتستمتع"}</h1>

        <div class="mb-3">

          <label for="number" class="block mb-2 text-center md:text-md text-sm font-bold text-gray-200 dark:text-white mt-2">{language == 'en' ? "Enter your Etisalat Mobile Number to receive OTP " : "دخل رقم هاتف اتصالات الخاص بك لتلقي OTP"}</label>
          <input
            type="number"
            id="number"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-blue-500 block w-full p-1.5 dark:bg-gray-50 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-900 focus:outline-none"
            placeholder={language == 'en' ? "Your number here" : "رقمك هنا"}
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            required
          />
        </div>
        <div className='mx-auto flex flex-row  gap-3 justify-center'>
          <button type="submit" class="text-white  bg-blue-700 hover:bg-blue-800   rounded-lg text-sm font-medium  sm:w-auto px-5 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 ">{language == 'en' ? "Subscribe" : "إشترك"}</button>
       
          <button type="button" onClick={handleClick} class="text-white bg-red-700 hover:bg-red-800 rounded-lg text-sm font-medium sm:w-auto px-5 py-2 text-center dark:bg-red-600 dark:hover:bg-red-700">
          {language == 'en' ? "Exit" : "خروج"}
      </button>
        </div>
  

      
        <p className='text-sm mt-1  text-white text-center'>{language=='en'?"Free for 24 hours then AED 11/weekly, VAT Included":" مجانًا لمدة 24 ساعة بعد ذلك ، سيتم تحصيل 11 درهمًا إماراتيًا / أسبوعًا (شاملاً ضريبة القيمة المضافة.) "}</p>

        <p className='text-sm mt-1  text-white text-center'>{language=='en' ?'After clicking "Subscribe", you will receive a message containing a PIN to confirm your subscription.':' بعد النقر على "اشترك"، ستتلقى رسالة تحتوي رمز PIN لتأكيد اشتراكك. '} </p>

      </form>
             
     
     

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

    <ToastContainer />



  </div>
  )
}

export default Subscription
