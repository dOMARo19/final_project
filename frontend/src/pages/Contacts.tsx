import React from 'react'
const Contacts = () => {
    return (
      <div className="container">
        <div className="contacts">
        <h1 className="contacts-title">Зв'яжіться з нами</h1>
  <button className="contact-button"> 
    <span className="icon">
      <svg height="33" viewBox="0 0 128 128" width="33" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"><linearGradient id="a" gradientTransform="matrix(1 0 0 -1 594 633)" gradientUnits="userSpaceOnUse" x1="-566.711" x2="-493.288" y1="516.569" y2="621.43">
        <stop offset="0" stop-color="#ffb900"></stop><stop offset="1" stop-color="#9100eb"></stop>
        </linearGradient>
        <circle cx="64" cy="64" fill="url(#a)" r="64"></circle>
        <g fill="#fff">
          <path d="m82.333 104h-36.666c-11.947 0-21.667-9.719-21.667-21.667v-36.666c0-11.948 9.72-21.667 21.667-21.667h36.666c11.948 0 21.667 9.719 21.667 21.667v36.667c0 11.947-9.719 21.666-21.667 21.666zm-36.666-73.333c-8.271 0-15 6.729-15 15v36.667c0 8.271 6.729 15 15 15h36.666c8.271 0 15-6.729 15-15v-36.667c0-8.271-6.729-15-15-15z"></path>
          <path d="m64 84c-11.028 0-20-8.973-20-20 0-11.029 8.972-20 20-20s20 8.971 20 20c0 11.027-8.972 20-20 20zm0-33.333c-7.352 0-13.333 5.981-13.333 13.333 0 7.353 5.981 13.333 13.333 13.333s13.333-5.98 13.333-13.333c0-7.352-5.98-13.333-13.333-13.333z"></path>
          <circle cx="85.25" cy="42.75" r="4.583"></circle>
          </g>
          </svg>
          </span>
    <span className="text1">Instagram</span>
    <span className="text2">1,2k</span> 
  </button>
  
  <button className="contact-button"> 
    <span className="icon">
      <svg xmlns="http://www.w3.org/2000/svg" width="33" viewBox="0 0 512 512" height="33">
      <g fill-rule="evenodd" clip-rule="evenodd">
        <path fill="#3a5ba2" d="m256.23 512c140.58 0 255.77-115.19 255.77-255.77 0-141.046-115.19-256.23-255.77-256.23-141.046 0-256.23 115.184-256.23 256.23 0 140.58 115.184 255.77 256.23 255.77z"></path>
        <path fill="#fff" d="m224.023 160.085c0-35.372 28.575-63.946 63.938-63.946h48.072v63.946h-32.199c-8.608 0-15.873 7.257-15.873 15.873v32.192h48.072v63.938h-48.072v144.22h-63.938v-144.22h-48.065v-63.938h48.065z"></path>
        </g>
        </svg>
        </span>
    <span className="text1">Facebook</span>
    <span className="text2">1,2k</span> 
  </button>
  
  <button className="contact-button"> 
    <span className="icon">
      <svg xmlns="http://www.w3.org/2000/svg" width="33" viewBox="0 0 120 120" height="33" fill="none">
      <path fill="#08c" d="m60 0c-33.1373 0-60 26.8627-60 60s26.8627 60 60 60 60-26.8627 60-60-26.8627-60-60-60z"></path>
      <path fill="#fff" d="m89.195 34.5144-10.7166 54.0314s-1.4985 3.7472-5.6203 1.9486l-24.7303-18.96-8.9925-4.3462-15.1378-5.0963s-2.3231-.824-2.5481-2.6226c-.2246-1.7986 2.6231-2.7727 2.6231-2.7727l60.1763-23.6062s4.9462-2.1731 4.9462 1.424z"></path>
      <path fill="#d2e5f1" d="m46.2272 87.9392s-.7219-.0675-1.6215-2.9157c-.899-2.8476-5.4704-17.8353-5.4704-17.8353l36.3456-23.0814s2.0986-1.274 2.0236 0c0 0 .3745.2246-.7495 1.2736-1.1241 1.0495-28.5521 25.7044-28.5521 25.7044"></path>
      <path fill="#b5cfe4" d="m57.6099 78.8041-9.7818 8.9184s-.7642.5804-1.6009.2167l1.8727-16.5662"></path>
      </svg>
      </span>
    <span className="text1">Telegram</span>
    <span className="text2">1,2k</span> 
  </button>
  
  <button className="contact-button"> 
    <span className="icon">
      <svg viewBox="0 0 24 24" height="33" width="33" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path>
      </svg>
      </span>
    <span className="text1">Github</span>
    <span className="text2">1,2k</span> 
  </button>
  </div>
      </div>
    )
  }
  
  export default Contacts
  