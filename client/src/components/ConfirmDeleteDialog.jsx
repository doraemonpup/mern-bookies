import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'

const ConfirmDeleteDialog = ({
  open,
  onCancel,
  onConfirm,
  title = 'Delete this book?',
  message = 'This action cannot be undone. The book will be permanently removed.',
}) => (
  <Dialog open={open} onClose={onCancel} maxWidth='xs' fullWidth>
    <DialogTitle
      variant='h3'
      component='h2'
      sx={{ pb: 1, pr: 3 }}
    >
      {title}
    </DialogTitle>
    <DialogContent sx={{ pb: 1 }}>
      <DialogContentText color='text.secondary'>{message}</DialogContentText>
    </DialogContent>
    <DialogActions sx={{ px: 3, pb: 2.5 }}>
      <Button onClick={onCancel} color='inherit' sx={{ color: 'text.secondary' }}>
        Cancel
      </Button>
      <Button onClick={onConfirm} variant='contained' color='error'>
        Delete
      </Button>
    </DialogActions>
  </Dialog>
)

export default ConfirmDeleteDialog
