import React from 'react'
import Modal from 'react-modal';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

interface User {
  id?: number;
  name: string;
  email: string;
  role: string;
}

interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (user: User) => void;
  user?: User | null; // null для додавання, об'єкт для редагування
}

const UserSchema = Yup.object().shape({
  name: Yup.string().required('Ім\'я є обов\'язковим'),
  email: Yup.string().email('Некоректний email').required('Email є обов\'язковим'),
  role: Yup.string().required('Роль є обов\'язковою'),
});

const UserModal: React.FC<UserModalProps> = ({ isOpen, onClose, onSave, user }) => {
  const isEditing = !!user;
  const initialValues = user || { name: '', email: '', role: 'user' };

  const handleSubmit = (values: User) => {
    onSave(values);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel={isEditing ? 'Редагувати користувача' : 'Додати користувача'}
      className="modal"
      overlayClassName="modal-overlay"
    >
      <h2>{isEditing ? 'Редагувати користувача' : 'Додати користувача'}</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={UserSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form className="user-form">
            <div className="form-group">
              <label htmlFor="name">Ім'я</label>
              <Field type="text" id="name" name="name" />
              {errors.name && touched.name && <div className="error">{errors.name}</div>}
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <Field type="email" id="email" name="email" />
              {errors.email && touched.email && <div className="error">{errors.email}</div>}
            </div>
            
            <div className="form-group">
              <label htmlFor="role">Роль</label>
              <Field as="select" id="role" name="role">
                <option value="user">Користувач</option>
                <option value="admin">Адміністратор</option>
              </Field>
              {errors.role && touched.role && <div className="error">{errors.role}</div>}
            </div>
            
            <div className="form-buttons">
              <button type="submit" className="btn-primary">
                {isEditing ? 'Зберегти' : 'Додати'}
              </button>
              <button type="button" className="btn-secondary" onClick={onClose}>
                Скасувати
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </Modal>
  )
}

export default UserModal
