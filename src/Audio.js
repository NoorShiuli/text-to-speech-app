import { useEffect } from 'react';

import Modal from 'react-modal';
import Spinner from './Spinner';

import './Audio.css'

const useEffectOnce = (effect) => {
    useEffect(effect, [effect]);
};

const Audio = (props) => {
    const { showModal, setShowModal, isLoading, text, blob } = props;
    const audio = blob ? URL.createObjectURL(blob) : null;

    useEffectOnce(() => {

    })

    return (
        <>
            <Modal
                isOpen={showModal}
                className="modal"
            >
                <Spinner isLoading={isLoading} />
                <div className='modal-content' hidden={isLoading}>
                    <textarea
                        rows={12}
                        cols={50}
                        disabled={true}
                        value={text}
                        className='showText'
                    ></textarea>
                </div>
                <audio controls id="audio-player" className="audiobtn" src={audio} hidden={isLoading}>
                    Your browser does not support the audio element.
                </audio>
                <div className="modalClose">
                    <button id="done-btn" className="closeBtn" onClick={() => { setShowModal(false) }}>
                        Close
                    </button>
                </div>
            </Modal>
        </>
    )
}

export default Audio;
