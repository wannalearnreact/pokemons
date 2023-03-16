import '../styles/components/Button.css';

const Button = ({ text, btnFunction, btnClass }) => {
    return (
        <div className='btn-container'>
            <button
                onClick={btnFunction}
                className={`btn-base btn-${btnClass}`}
            >
                {text}
            </button>
        </div>
    );
};

export default Button;
