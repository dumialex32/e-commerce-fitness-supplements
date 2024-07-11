const Footer: React.FC = () => {
  const date = new Date().getFullYear();
  return (
    <footer className="footer footer-center bg-base-300 text-base-content p-4">
      <aside>
        <p>Copyright © {date} - All right reserved by Dev Muscle</p>
      </aside>
    </footer>
  );
};

export default Footer;
