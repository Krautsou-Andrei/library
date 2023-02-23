export const Button = ({ onClick, title, className, ...props }) => (
  <button className={className} type='button' onClick={onClick} {...props}>
    {title}
  </button>
);
