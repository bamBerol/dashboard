import style from "./Footer.module.css";

const Footer = () => {
  const date = new Date();
  const year = date.getFullYear();

  return (
    <>
      <footer className={style.footer}>&copy; devTro {year}</footer>
    </>
  );
};

export default Footer;
