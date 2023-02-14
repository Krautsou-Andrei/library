export const IconArrowMenuBurger = ({ className, fill, colorFirst, colorSecond }) => (
  <svg className='arrow' width='14' height='8' viewBox='0 0 14 8' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path
      className={className ? className : ''}
      fillRule='evenodd'
      clipRule='evenodd'
      d='M6.29289 0.292893C6.68342 -0.0976311 7.31658 -0.0976311 7.70711 0.292893L13.7071 6.29289C14.0976 6.68342 14.0976 7.31658 13.7071 7.70711C13.3166 8.09763 12.6834 8.09763 12.2929 7.70711L7 2.41421L1.70711 7.70711C1.31658 8.09763 0.683417 8.09763 0.292893 7.70711C-0.0976311 7.31658 -0.0976311 6.68342 0.292893 6.29289L6.29289 0.292893Z'
      fill={fill ? fill : 'url(#paint0_linear_14353_5325)'}
    />
    <defs>
      <linearGradient
        id='paint0_linear_14353_5325'
        x1='6.74785'
        y1='-14.875'
        x2='-23.3724'
        y2='26.9297'
        gradientUnits='userSpaceOnUse'
      >
        <stop stopColor='#f83600' />
        <stop offset='1' stopColor='#f9d423' />
      </linearGradient>
    </defs>
  </svg>
);
