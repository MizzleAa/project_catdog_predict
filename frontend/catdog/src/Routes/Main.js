import React, { useState, useEffect } from 'react';

import api from '../API/CatDog';
import Header from '../Components/Layout/Header'
import ScrollState from '../Components/Layout/ScrollState';
import Footer from '../Components/Layout/Footer'

///////////////////////////////////////////
import {
    UploadIcon,
} from '@heroicons/react/outline'

import InputSampleImage from "../Assets/images/input_sample.png"
import PredictSampleImage from "../Assets/images/predict_sample.png"

import CNNPng from "../Assets/images/cnn.png"


const ProgressBar = ({ label, progressPercentage }) => {
    return (
        <div className='mx-2 h-10 w-full bg-gray-300 text-center text-white rounded-lg shadow-lg'>
            <div
                style={{ width: `${progressPercentage}%`}}
                className={`h-full rounded-lg flex justify-center items-center font-black ${progressPercentage < 80 ? 
                    'bg-gradient-to-r from-blue-300 to-blue-500' :
                    'bg-gradient-to-r from-blue-400 to-blue-600'
                    }`}>
                <label className="px-2">{label}&nbsp;:</label>
                <label>{progressPercentage}%</label>
            </div>
        </div>
    );
};


function Main() {
    const [fileName, setFileName] = useState('');
    const [inputImageURL,setInputImageURL] = useState('');
    const [predictImageURL,setPredictImageURL] = useState('');
    const [predictResult,setPredictResult] = useState([]);
    const [predictModel,setPredictModel] = useState([]);
    const [predictModelState, setPredictModelState] = useState('');

    const [wheel, setWheel] = useState(0);
    const [wheelPercent, setWheelPercent] = useState(0);


    useEffect( () => {
        onHandlerCNNOptions();
    },[])

    ///////////////////////////
    const onWheelState = (e) => {
        let _wheel = wheel + e.deltaY*1.5
        
        if (wheel < 0){
            _wheel = 0
        }

        if (wheel > document.body.scrollHeight){
            _wheel = document.body.scrollHeight
        }

        let _wheelPercent = Number( _wheel / document.body.scrollHeight * 100 )

        setWheel(_wheel);
        setWheelPercent(_wheelPercent);
    }

    const onChangePredictModelState = (e) =>{
        setPredictModelState(e.target.value);
    }

    const onHandlerCNNOptions = () => {
        api.post("predict_model_list/")
        .then(response => {
            setPredictModelState(response.data[0].model_name);
            setPredictModel(response.data);
        })
        .catch(error => {
            console.log(error);
        })
    }

    const onChangeInputFile = (e) => {

        e.preventDefault();
        
        const splitFileName = String(e.target.value).split("\\");
        const fileName = splitFileName[splitFileName.length-1]

        setFileName(fileName);
        const formData = new FormData();

        //formData.append({ [e.target.name]: e.target.value });
        formData.append('input_file_name', fileName);
        formData.append('files', e.target.files[0]);
        formData.append('model_name', predictModelState);
        //console.log(e.target.files[0]);
        api.post("create/", formData,{
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
        .then(response => {
            setInputImageURL(response.data.input_image_url);
            setPredictImageURL(response.data.predict_image_url);
            setPredictResult(response.data.predict_result);
        })
        .catch(error => {
            console.log(error);
        })
    }
    ///////////////////////////
    
    return (
        <div className="min-w-screan min-h-full"  onWheel={onWheelState} >
            <Header />
            <ScrollState 
                wheelPercent={wheelPercent}
            />
            <div className="w-full min-w-full">
                {/*todo:*/}
                <div className="w-full bg-white px-64 py-12">
                    {/*title*/}
                    <div className="flex items-end pb-12">
                        <label className="text-4xl font-bold border-b-8 border-blue-400">
                            1.&nbsp;What is this
                        </label>
                    </div>
                    {/*contexts*/}
                    <div className="px-8 pb-8">
                        <div className="text-2xl leading-loose">
                            <label className="border-b-4 border-indigo-400 font-bold">"?????????"</label>????&nbsp;???&nbsp;
                            <label className="border-b-4 border-purple-400 font-bold">"?????????"</label>??????? ???????????? ???????????? ????????? ?????? ????????? ????????????.
                            ???????????? ?????? ???????????? ?????? ??? ?????? ?????? ????????? ???????????? ????????? ??? ??????.
                        </div>
                    </div>
                </div>
                {/*todo:*/}
                <div className="w-full bg-gray-50 px-64 py-12">
                    {/*title*/}
                    <div className="pb-12">
                        <label className="text-4xl font-bold border-b-8 border-blue-400">
                            2.&nbsp;Technology
                        </label>
                    </div>
                    {/*contexts*/}
                    <div className="px-8 pb-8">
                        <div className="text-2xl leading-loose">
                            <label className="border-b-4 border-yellow-200 font-bold">"????????? ?????????(Convolutional neural network, CNN)"</label>???
                            ????????? ????????? ???????????? ??? ???????????? ????????? ??????-??????????????? ?????????????????? ??? ????????????.
                            ??? ???????????? ?????? ??????????????? ????????????, <label className="border-b-4 border-yellow-200 font-bold">"????????? ?????? ??????"</label>??? ?????? ????????????.&nbsp;
                            ?????? ?????? ????????? ????????? ?????? ????????? ????????? ???????????? ?????? ?????? ?????? ?????? ?????? ?????? ????????? (SIANN)????????? ????????? ??????.&nbsp;
                            <label className="border-b-4 border-red-200 font-bold">"?????? ??? ????????? ??????"</label>,&nbsp;
                            <label className="border-b-4 border-red-200 font-bold">"?????? ??????"</label>,&nbsp;
                            <label className="border-b-4 border-red-200 font-bold">"?????? ?????? ??????"</label>,&nbsp;
                            <label className="border-b-4 border-red-200 font-bold">"????????? ??????"</label>&nbsp;
                            ?????? ????????????.
                            
                        </div>
                        <div className="flex justify-center align-center py-8">
                            <img className="rounded-xl shadow-md" src={CNNPng} alt="cnn"/>
                        </div>
                        <div className="text-2xl leading-loose">
                            <label className="border-b-4 border-yellow-200 font-bold">"????????? ?????????(Convolutional neural network, CNN)"</label>???&nbsp;
                            <label className="border-b-4 border-red-200 font-bold">"?????? ??????(Feature Extraction)"</label>???&nbsp;
                            <label className="border-b-4 border-red-200 font-bold">"??????(Classification)"</label>??????,
                            ????????? ??????.
                        </div>
                        <div className="text-2xl leading-loose pt-4">
                            <label className="border-b-4 border-red-200 font-bold">"?????? ??????(Feature Extraction)"</label>???&nbsp;
                            <label className="border-b-4 border-green-200 font-bold">"????????? ????????? ????????? ?????? ??????????"</label>??? ?????? ????????? ?????? ????????????, ?????? ???(Convolution Matrix)??? ???????????? ????????? ????????? ????????? ?????? ????????????, ????????? ????????? ????????? ???????????? ????????? ??????.
                            
                        </div>
                        <div className="text-2xl leading-loose pt-4">
                            <label className="border-b-4 border-red-200 font-bold">"??????(Classification)"</label>???&nbsp;
                            <label className="border-b-4 border-red-200 font-bold">"?????? ??????(Feature Extraction)"</label>???????????? ????????? ??????????????? ?????? ????????? ?????????&nbsp;
                            <label className="font-bold">"Full Connection Networ"</label>????????? ????????????, ?????? ???????????? ????????? ????????????.
                        </div>
                    </div>
                </div>
                {/*todo:*/}
                <div className="w-full px-64 py-8">
                    {/*title*/}
                    <div className="pb-12">
                        <label className="text-4xl font-bold border-b-8 border-blue-400">
                            3.&nbsp;Action
                        </label>
                    </div>
                    {/*contexts*/}
                    <div className="px-8 pb-8">
                        <div className="flex items-center justify-center">
                            <select onChange={onChangePredictModelState} className="h-16 text-2xl leading-loose font-bold w-full cursor-pointer inline-flex justify-start items-center px-4 py-2 border border-transparent shadow-sm text-base font-medium rounded-md text-yellow-200 bg-blue-300 hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400">
                                {
                                    predictModel && predictModel.map( (element) => (
                                        <option key={element.id} className="text-2xl leading-loose font-bold w-full cursor-pointer inline-flex justify-start items-center px-4 py-2 border border-transparent shadow-sm text-base font-medium rounded-md text-black bg-white focus:outline-none focus:ring-2 focus:ring-offset-2">
                                            {element.model_name}
                                        </option>
                                    ))
                                }
                            </select>
                        </div>

                        <div className="flex items-center justify-center pt-5">
                            <label className="w-full cursor-pointer inline-flex justify-start items-center px-4 py-2 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-blue-400 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                <UploadIcon className="mr-2 h-8 w-8"/>
                                <span className="text-2xl leading-loose font-bold">Select a File&nbsp;:&nbsp;</span>
                                <span className="text-2xl leading-loose font-bold text-yellow-200">{fileName}</span>
                                <input type='file' className="hidden" accept="image/jpg, image/png" onChange={onChangeInputFile} />
                            </label>
                        </div>
                        
                        <div className="flex justify-start items-center text-2xl leading-loose pt-4">
                            <div className="w-1/2">
                                <div className="mx-2 border-b-4 border-blue-200 font-bold">
                                    INPUT
                                </div>
                                <div className="mx-2 py-4">
                                    { !inputImageURL &&
                                        <img
                                            className="shadow-md rounded-xl"
                                            src={InputSampleImage}
                                            alt="input Images"
                                        />
                                    }
                                    {inputImageURL && 
                                        <img
                                            className="shadow-md rounded-xl"
                                            src={inputImageURL}
                                            alt="input Images"
                                        />
                                    }
                                </div>
                            </div>
                            <div className="w-1/2">
                                <div className="mx-2 border-b-4 border-indigo-200 font-bold">
                                    PREDICT
                                </div>
                                <div className="mx-2 py-4">
                                    { !predictImageURL &&
                                        <img
                                            className="shadow-md rounded-xl"
                                            src={PredictSampleImage}
                                            alt="input Images"
                                        />
                                    }
                                    {predictImageURL &&
                                        <img
                                            className="shadow-md rounded-xl"
                                            src={predictImageURL}
                                            alt="predict Images"
                                        />
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/*todo:*/}
                <div className="w-full bg-gray-50 px-64 py-8">
                    {/*title*/}
                    <div className="pb-12">
                        <label className="text-4xl font-bold border-b-8 border-blue-400">
                            4.&nbsp;Result
                        </label>
                    </div>
                    
                    {/*contexts*/}
                    <div className="px-8 pb-8">
                        
                        {
                            predictResult && predictResult.map( (element) => (
                                <div key={element.id} className="flex justify-center items-center font-thin text-center pb-4">
                                    <ProgressBar 
                                        label={element.label.toUpperCase()}
                                        progressPercentage={parseInt(element.score)}
                                    />
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Main;