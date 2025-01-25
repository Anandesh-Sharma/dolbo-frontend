const CardBrandIcons = {
  visa: (
    <svg className="h-6" viewBox="0 0 48 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M44.688 0.725H41.684C40.751 0.725 40.057 0.975 39.647 1.924L34.466 14.724H38.395C38.395 14.724 39.028 13.031 39.165 12.674C39.508 12.674 43.03 12.674 43.467 12.674C43.571 13.131 43.899 14.724 43.899 14.724H47.4L44.688 0.725ZM40.115 9.774C40.397 9.074 41.615 5.974 41.615 5.974C41.598 6.024 41.924 5.224 42.122 4.724L42.396 5.874C42.396 5.874 43.195 9.174 43.336 9.774H40.115Z" fill="#1434CB"/>
      <path d="M34.012 10.174C34.012 13.324 31.123 14.974 28.337 14.974C27.028 14.974 25.872 14.674 25.18 14.374L25.77 11.224L26.189 11.424C27.149 11.874 27.834 12.024 28.972 12.024C29.905 12.024 30.907 11.624 30.907 10.774C30.907 10.224 30.495 9.874 29.144 9.274C27.852 8.674 26.189 7.674 26.189 5.924C26.189 2.924 29.042 1.124 31.725 1.124C32.863 1.124 33.795 1.374 34.383 1.624L33.811 4.674L33.537 4.524C32.88 4.274 32.24 4.124 31.348 4.124C30.082 4.124 29.385 4.674 29.385 5.274C29.385 5.824 30.014 6.224 31.194 6.774C33.126 7.674 34.012 8.824 34.012 10.174Z" fill="#1434CB"/>
      <path d="M0 1.374L0.068 1.074H5.781C6.508 1.124 7.098 1.374 7.235 2.174L8.339 8.374C7.098 4.924 4.005 2.574 0 1.374Z" fill="#1434CB"/>
      <path d="M20.553 1.024L14.933 14.724H10.987L7.68 3.374C9.837 5.574 11.354 8.424 12.147 10.474L12.557 11.974L16.624 1.024H20.553Z" fill="#1434CB"/>
    </svg>
  ),
  mastercard: (
    <svg className="h-6" viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15.795 1.473H8.205V14.527H15.795V1.473Z" fill="#FF5F00"/>
      <path d="M8.205 8C8.205 5.473 9.3 3.2 11.047 1.473C9.877 0.537 8.398 0 6.789 0C3.033 0 0 3.582 0 8C0 12.418 3.033 16 6.789 16C8.398 16 9.877 15.463 11.047 14.527C9.3 12.8 8.205 10.527 8.205 8Z" fill="#EB001B"/>
      <path d="M24 8C24 12.418 20.967 16 17.211 16C15.602 16 14.123 15.463 12.953 14.527C14.7 12.8 15.795 10.527 15.795 8C15.795 5.473 14.7 3.2 12.953 1.473C14.123 0.537 15.602 0 17.211 0C20.967 0 24 3.582 24 8Z" fill="#F79E1B"/>
    </svg>
  ),
  amex: (
    <svg className="h-6" viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M22.794 16H1.206C0.54 16 0 15.46 0 14.794V1.206C0 0.54 0.54 0 1.206 0H22.794C23.46 0 24 0.54 24 1.206V14.794C24 15.46 23.46 16 22.794 16Z" fill="#2E77BC"/>
      <path d="M13.552 8.094L12 4.747L10.448 8.094H13.552ZM16.302 11.441H14.75L14.198 10.039H9.802L9.25 11.441H7.698L11.198 4.559H12.802L16.302 11.441Z" fill="white"/>
    </svg>
  ),
  discover: (
    <svg className="h-6" viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M22.794 16H1.206C0.54 16 0 15.46 0 14.794V1.206C0 0.54 0.54 0 1.206 0H22.794C23.46 0 24 0.54 24 1.206V14.794C24 15.46 23.46 16 22.794 16Z" fill="#4D4D4D"/>
      <path d="M12 4C9.791 4 8 5.791 8 8C8 10.209 9.791 12 12 12C14.209 12 16 10.209 16 8C16 5.791 14.209 4 12 4Z" fill="#FF6B1B"/>
    </svg>
  ),
  cvc: (
    <svg className="h-6 opacity-50" viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="1" y="1" width="22" height="14" rx="2" stroke="currentColor" strokeWidth="2"/>
      <path d="M16 8H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  )
};

export default CardBrandIcons; 