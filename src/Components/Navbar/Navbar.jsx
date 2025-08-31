import { useState, useEffect } from 'react';
import { FaBars, FaTimes, FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Donate', path: '/donate' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.navbarContainer}>
        <Link to="/" className={styles.navbarLogo}>
          Nex<span>Med</span>
        </Link>

        <div className={styles.menuIcon} onClick={toggleMenu}>
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </div>

        <ul className={`${styles.navMenu} ${isMenuOpen ? styles.active : ''}`}>
          {navItems.map((item, index) => (
            <li key={index} className={styles.navItem}>
              <Link 
                to={item.path} 
                className={styles.navLink} 
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            </li>
          ))}
          <li className={styles.navItem}>
            <Link to="/login" className={styles.loginButton} onClick={() => setIsMenuOpen(false)}>
              <FaUser className={styles.loginIcon} />
              <span>Login</span>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

