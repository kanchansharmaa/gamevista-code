import React , {useState,useEffect} from 'react'
import logo from '../assets/logo_gameit.png'
import bg2 from '../assets/bg2.jpg'
import './Subscription.css';
import OtpInput from 'react-otp-input';

const Otp = () => {
  
  const [language,setLangauge]=useState('en')


  return (
    <div className="bg" style={{ backgroundImage: `url(${bg2})` }}>
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

      
<div className='flex justify-center mt-10 md:mt-0'>
<div class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
   
<h5 class=" text-center mt-[-10px] text-xl font-bold tracking-tight text-gray-800 dark:text-white">{language=='en'?"Terms & Conditions":"الشروط والأحكام:"}</h5>
          <p class="font-medium text-lg text-gray-800 dark:text-gray-400">{language=='en'?"By Subscribing to this Service, you have agreed to the following terms and conditions.":'من خلال النقر على زر الاشتراك أعلاه ، سوف توافق على الشروط والأحكام التالية'} </p>

          {language=='en'?      <ul class=" text-gray-700 text-lg md:text-sm   list-disc  list-inside">
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
  {/* <p className='mt-2 text-gray-800 text-center'>For complete T&C click here. Privacy Policy</p> */}
</ul>:
<div className='flex flex-col self-end'>
<ul class=" text-gray-800  text-sm list-disc  list-inside">
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
  {/* <p className='mt-2 text-white text-center'>للحصول على الشروط والأحكام الكاملة انقر هنا. سياسة الخصوصية</p> */}
</ul>
</div>
}
</div>
</div>


  
    </div>
  )
}

export default Otp
