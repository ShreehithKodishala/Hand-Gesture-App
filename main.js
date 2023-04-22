var prediction = "";

Webcam.set({

    width:450,
    height:393,
    image_format: 'png',
    png_quality: 90
    
    });
    
    Camera = document.getElementById("camera");
    
    Webcam.attach ('#Camera');
    
    function take_snapshot() {
    
    Webcam.snap(function(data_uri) {
    document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';
    }
    );
    
    }
    console.log('ml5_version',ml5.version );
    
    classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/iHn3fvVwG/model.json',modelLoaded);
    
    function modelLoaded() {
    console.log('Model Loaded')
    
    }

    function speak(){

        var synth = window.speechSynthesis;
        speak_data = "The prediction is "+ prediction;
        var utterThis = new SpeechSynthesisUtterance(speak_data);
        synth.speak(utterThis);

    }

    function got_result() {
        img = document.getElementById('captured_image');
        classifier.classify(img, gotResult);
    
        }

        function gotResult(error, results) {

            if(error) {
            
                console.error(error);
            
            }
            
            else {
                document.getElementById("result_emoji_name").innerHTML = results[0].label;
                prediction = results[0].label;
                speak();

                if(results[0].label == "amazing"){

                    document.getElementById("result_emoji").innerHTML = "&#128076;";
                    document.getElementById("quote").innerHTML = "That's Amazing";
                    }
                    
                else if(results[0].label == "like"){
                    
                        document.getElementById("result_emoji").innerHTML = "&#128077;";
                        document.getElementById("quote").innerHTML = "That's a Like";


                }

                else if(results[0].label == "dislike"){

                      document.getElementById("result_emoji").innerHTML = "&#128078;";
                      document.getElementById("quote").innerHTML = "That's a Dislike";

                    }
            }



    
        }