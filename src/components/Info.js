import '../styles/components/Info.css';
const Info = ({ text, height, fontSize }) => {
    return (
        <div
            className='info-container'
            style={{ height, fontSize: `${fontSize}` }}
        >
            <div className='info'>{text}</div>
        </div>
    );
};
export default Info;
