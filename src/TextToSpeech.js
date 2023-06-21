import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Audio from './Audio';
import './FormikTTS.css'

const TextToSpeech = () => {
    const initialValues = {
        text: '',
    };
    const [isLoading, setIsLoading] = useState(false);

    const validationSchema = Yup.object({
        text: Yup.string()
            .required('Text is required')
            .max(1000, "Text must be at most 1000 characters long"),
    });

    const handleSubmit = (values) => {
        setIsLoading(true);
        const { text } = values;
        const url = `http://localhost:8080/text-to-speech/?text=${encodeURIComponent(text)}`;

        fetch(url)
            .then((response) => response.blob())
            .then((blob) => {
                setIsLoading(false);
                const audioPlayer = document.getElementById('audio-player');
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
                            maxLength="1000"
                        ></Field>
                    </div>
                    <div className="container">
                        <button id="convert-btn" className="button" type="submit" disabled={isLoading}>
                            Convert
                        </button>
                        <Audio />
                    </div>
                </div>
            </Form>
        </Formik>
    );
};

export default TextToSpeech;
