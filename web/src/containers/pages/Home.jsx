import styled from "styled-components";
import UploadWidget from '../../components/UploadWidget';
import { useState } from "react";

const Home = () => {
  const [url, updateUrl] = useState();
  const [error, updateError] = useState();

  function handleOnUpload(error, result, widget) {
    if ( error ) {
      updateError(error);
      widget.close({
        quiet: true
      });
      return;
    }
    console.log(result)
    updateUrl(result?.info?.secure_url);
  }


    return (
    <Container>
      <main className="main">
      <div className="container">
        <UploadWidget onUpload={handleOnUpload}>
          {({ open }) => {
            function handleOnClick(e) {
              e.preventDefault();
              open();
            }
            return (
              <button onClick={handleOnClick}>
                Upload an Image
              </button>
            )
          }}
        </UploadWidget>

        {error && <p>{ error }</p>}

        {url && (
          <>
            <p><img src={ url } alt="Uploaded resource" /></p>
            <p>{ url }</p>
          </>
        )}
      </div>

    </main>
    </Container>
  );
};

const Container = styled.div`
  background: #fff;
  width: 100%;
  padding: 12px 0;

`

export default Home
