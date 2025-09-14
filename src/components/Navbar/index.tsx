import styles from './styles.module.css'
import Image from 'next/image'

function Navbar() {
    return (
        <nav className={styles.Navbar}>
            <Image
                className='img'
                src="/pokemon-256.png"
                alt="Logomarca Pokemon"
                width={200}
                height={150}
            />
            <p>Sua enciclopédia completa de Pokémon</p>
        </nav>
    );
}
export default Navbar;