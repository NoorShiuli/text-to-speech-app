import "./Spinner.css"

const Spinner = ({ isLoading }) => {
    return (<div class="spinner" hidden={!isLoading}></div>)
}

export default Spinner;
