import React, { useCallback, useMemo } from 'react'
import { useDropzone } from 'react-dropzone'
import { Col, ProgressBar } from 'react-bootstrap'
import { baseStyle, activeStyle, acceptStyle, rejectStyle } from '../Dropzone/dropzoneStyle'

const Dropzone = ({ locationId, fileUploader }) => {
	const onDrop = useCallback((acceptedFiles) => {
		fileUploader.upload(acceptedFiles[0], locationId)
	}, [])

	const {
		getRootProps,
		getInputProps,
		isDragActive,
		isDragAccept,
		isDragReject
	} = useDropzone({
		accept: {
			'image/gif': ['.gif'],
			'image/jpeg': ['.jpg', '.jpeg'],
			'image/png': ['.png'],
			'image/webp': ['.webp'],
		},
		maxFiles: 1,
		maxSize: 2 * 1024 * 1024,
		multiple: false,
		onDrop,
	})
	const style = useMemo(() => ({
		...baseStyle,
		...(isDragActive ? activeStyle : {}),
		...(isDragAccept ? acceptStyle : {}),
		...(isDragReject ? rejectStyle : {})
	}), [isDragAccept, isDragActive, isDragReject])

	return (
		<>
			{fileUploader.progress === 0 ? (
				<div {...getRootProps({ style })}>
					<input {...getInputProps()} />
					{isDragActive ? (
						<p>Lämna filen här tack.</p>
					): (
						<p>Dra och lämna en fil här eller klicka för att hämta en fil</p>
					)}
				</div>
			): (
				<Col>
					<ProgressBar animated variant='success' value={fileUploader.progress}/>
				</Col>
			)}
		</>
	)
}

export default Dropzone