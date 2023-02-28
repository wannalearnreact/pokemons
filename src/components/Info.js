import '../styles/components/Info.css';
const Info = ({ text }) => {
    return (
        <div className='info-main'>
            <div className='info'>{text}</div>;
        </div>
    );
};

export default Info;
