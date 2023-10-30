import style from "./Footer.module.css";

const Footer = (props) => {
  const date = new Date();
  const year = date.getFullYear();

  return (
    <>
      <footer className={props.navIsOpen ? style.footer : style.footerSmall}>
        <p>&copy; devTro</p>
        <p>{year}</p>
      </footer>
    </>
  );
};

export default Footer;
