/* eslint-disable no-unused-vars */
import classNames from 'classnames/bind';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useNavigate } from 'react-router-dom';

import styles from './Upload.module.scss';
import { ReactComponent as UploadIcon } from 'assets/icons/upload.svg';
import Button from 'app/components/Button';
import { useCallback, useEffect, useRef, useState } from 'react';
import UploadPreview from 'app/containers/UploadPreview';
import { MB_50 } from 'utils/constants';
import SnackbarCustomize from 'app/components/SnackbarCustomize';
import { getUserData } from 'utils/storage';
import DialogCustomize from 'app/components/DialogCustomize';
import PopupBackorContinue from 'app/components/PopupBackorContinue';

const cx = classNames.bind(styles);

const PostSchema = Yup.object().shape({
  contents: Yup.string()
    .lowercase()
    .trim()
    .max(150, 'Maximum 150 characters!')
    .required('Caption is required field'),
});

interface ContentsValuesTypes {
  contents: string;
}

export function Upload() {
  const [mediaFile, setMediaFile] = useState();
  const [sizeLimitNotify, setSizeLimitNotify] = useState(false);
  const [caption, setCaption] = useState('');
  const inputRef = useRef<any>(null);
  const [isBackorDiscard, setIsBackorDiscard] = useState(false);

  const navigate = useNavigate();

  const { _id } = getUserData();

  useEffect(() => {
    if (!_id) {
      navigate('/');
    }
  }, [_id]);

  const chooseMediaFile = useCallback(
    (selectorFiles: any) => {
      const files = selectorFiles.target.files;
      if (files[0]?.size > MB_50) {
        setSizeLimitNotify(true);
        selectorFiles.target.value = null;
        return;
      }
      if (files) setMediaFile(files[0]);
    },
    [mediaFile, setMediaFile, sizeLimitNotify, setSizeLimitNotify],
  );

  const handlePost = useCallback(
    (values: ContentsValuesTypes) => {
      const contents = values.contents;
      console.log(contents);
      console.log(mediaFile);

      const formData = new FormData();
      if (mediaFile) formData.append('media_url', mediaFile);
      if (contents) formData.append('contents', contents);
    },
    [mediaFile, setMediaFile],
  );

  const handleCloseSnackbar = useCallback(() => {
    setSizeLimitNotify(false);
  }, [sizeLimitNotify, setSizeLimitNotify]);

  const onChangeVideo = useCallback(() => {
    setMediaFile(undefined);
    inputRef.current.value = null;
  }, [mediaFile, setMediaFile]);

  const handleOnOpenDialog = useCallback(() => {
    setIsBackorDiscard(true);
  }, [isBackorDiscard, setIsBackorDiscard]);

  const handleOnCloseDialog = useCallback(() => {
    setIsBackorDiscard(false);
  }, [isBackorDiscard, setIsBackorDiscard]);

  const onDiscard = useCallback(() => {
    setIsBackorDiscard(false);
    navigate('/');
  }, [isBackorDiscard, setIsBackorDiscard]);
  return (
    <>
      <div className={cx('wrapper')}>
        <div className={cx('container')}>
          <div className={cx('content')}>
            <header className={cx('header')}>
              <h1>Upload video</h1>
              <p>Post a video to your account</p>
            </header>
            <main className={cx('upload')}>
              <input
                ref={inputRef}
                onChange={chooseMediaFile}
                className={cx('input')}
                id="uploadInput"
                type="file"
              />
              <div className={cx('show')}>
                {mediaFile ? (
                  <UploadPreview
                    caption={caption}
                    file={mediaFile}
                    onChangeVideo={onChangeVideo}
                  />
                ) : (
                  <div className={cx('chooseMediaWrapper')}>
                    <label
                      htmlFor="uploadInput"
                      className={cx('chooseMedia')}
                    ></label>
                    <div className={cx('chooose')}>
                      <div className={cx('choooseWrapper')}>
                        <UploadIcon className={cx('uploadIcon')} />
                        <div className={cx('textMain')}>
                          Select video to upload
                        </div>
                        <div className={cx('textSub')}>
                          Or drag and drop a file
                        </div>
                        <div className={cx('textDescWrapper')}>
                          <p className={cx('textDesc')}>MP4 or WebM</p>
                          <p className={cx('textDesc')}>
                            720x1280 resolution or higher
                          </p>
                          <p className={cx('textDesc')}>Up to 10 minutes</p>
                          <p className={cx('textDesc')}>Less than 2 GB</p>
                        </div>
                        <Button className={cx('selectFile')} primary>
                          Select file
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className={cx('formWrapper')}>
                <Formik
                  initialValues={{
                    contents: '',
                  }}
                  validationSchema={PostSchema}
                  onSubmit={values => {
                    handlePost(values);
                  }}
                >
                  {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    /* and other goodies */
                  }) => (
                    <form className={cx('form')} onSubmit={handleSubmit}>
                      <div className={cx('contents')}>
                        <label
                          className={cx('contentsLabel')}
                          htmlFor="contents"
                        >
                          Caption
                        </label>
                        <div className={cx('contentsInputWrapper')}>
                          <input
                            className={cx('contentsInput')}
                            autoComplete="off"
                            type="contents"
                            name="contents"
                            onChange={e => {
                              handleChange(e);
                              setCaption(e.target.value);
                            }}
                            onBlur={handleBlur}
                            value={values.contents}
                            id="contents"
                          />
                        </div>
                      </div>

                      <div className={cx('btnWrapper')}>
                        <Button
                          className={cx('btn', 'discard')}
                          box
                          type="text"
                          onClick={handleOnOpenDialog}
                        >
                          Discard
                        </Button>
                        <Button className={cx('btn')} primary type="submit">
                          Post
                        </Button>
                      </div>
                    </form>
                  )}
                </Formik>
              </div>
            </main>
          </div>
        </div>
      </div>
      <SnackbarCustomize
        autoHideDuration={3000}
        open={sizeLimitNotify}
        onClose={handleCloseSnackbar}
        type="error"
        horizontal="center"
        vertical="top"
        content="Maximum 50MB!"
      />
      <DialogCustomize open={isBackorDiscard} onClose={handleOnCloseDialog}>
        <PopupBackorContinue
          onDiscard={onDiscard}
          onClosePopup={handleOnCloseDialog}
          title="Discard this post?"
          desc="The video and all edits will be discarded."
          okBtn="Discard"
          cancelBtn="Continue editing"
        />
      </DialogCustomize>
    </>
  );
}
