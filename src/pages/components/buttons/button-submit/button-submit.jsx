export const ButtonSubmit = ({ onClick, title, className, isDisabled, ...props }) => (
  <button className={className} type='submit' onClick={onClick} disabled={isDisabled} {...props}>
    {title}
  </button>
);
