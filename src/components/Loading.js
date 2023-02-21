import '../styles/components/Loading.css';

const Loading = ({ height }) => {
    return (
        <div className='loading-container' style={{ height: `${height}` }}>
            <div class='loading'></div>;
        </div>
    );
};

export default Loading;
