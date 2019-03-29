import React from 'react'
import {withStyles} from '@material-ui/core'
import CircularProgress from '@material-ui/core/CircularProgress';
import Modal from '@material-ui/core/Modal';

const styles = theme => ({
  modal: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalInner: {
    width: '90%',
    maxWidth: 1280,
  },
  modalItem: {
    position: 'relative',
    paddingTop: '56.25%', // 16:9
    backgroundColor: '#fff'
  },
  modalLoading: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: '-20px',
    marginLeft: '-20px',
  },
  modalItemInner: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
  }
})

const VideoModal = ({ classes, youtube, modalOpen, handleModalClose }) => (
  <Modal open={modalOpen} onClose={handleModalClose} className={classes.modal}>
    {youtube
      ? <div className={classes.modalInner}>
          <div className={classes.modalItem}>
            <CircularProgress className={classes.modalLoading} />
              <iframe className={classes.modalItemInner}
                title={youtube.fn.update_name}
                src={`https://www.youtube-nocookie.com/embed/${youtube.id}?autoplay=1&showinfo=0&rel=0&start=${youtube.fn.start}&end=${youtube.fn.end}`}
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen></iframe>
          </div>
        </div>
      : null}
  </Modal>
)


export default withStyles(styles)(VideoModal);
