import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

import Audio from './Audio';

import './TextToSpeech.css'

const TextToSpeech = () => {
    const initialValues = {
        text: '',
    };
    const [isLoading, setIsLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [text, setText] = useState('');

    const validationSchema = Yup.object({
        text: Yup.string()
            .required('Text is required')
    });

    const handleSubmit = (values) => {
        setIsLoading(true);
        const { text } = values;
        const url = `http://localhost:8080/text-to-speech/?text=${encodeURIComponent(text)}`;
        setText(text);
        setShowModal(true);

        fetch(url)
            .then((response) => response.blob())
            .then((blob) => {
                setIsLoading(false);
                const audioPlayer = document.getElementById('audio-player');
                audioPlayer.defaultPlaybackRate = 1.25;
                audioPlayer.src = URL.createObjectURL(blob);
                audioPlayer.play();
            })
            .catch((error) => {
                console.log('Error:', error);
                const audioPlayer = document.getElementById('audio-player');
                audioPlayer.src = URL.createObjectURL(error.blob());
                audioPlayer.play();
            });
    }

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            <Form>
                <div className="mainContainer darkBackground">
                    <div>
                        <Field
                            placeholder="Enter your text here..."
                            id="text"
                            name="text"
                            as="textarea"
                            rows={12}
                            cols={50}
                            className="text"
                        ></Field>
                    </div>
                    <div className="container">
                        <button id="convert-btn" className="button" type="submit" disabled={isLoading}>
                            Play Audio
                        </button>
                        <Audio showModal={showModal} setShowModal={setShowModal} isLoading={isLoading} text={text}/>
                    </div>
                </div>
            </Form>
        </Formik>
    );
};

export default TextToSpeech;
