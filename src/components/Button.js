import '../styles/components/Button.css';

const Button = ({ text, btnFunction }) => {
    return (
        <div className='btn-container'>
            <button onClick={btnFunction} className='btn'>
                {text}
            </button>
        </div>
    );
};

export default Button;
