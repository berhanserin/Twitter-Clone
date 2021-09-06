import {Formik} from 'formik';
import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import * as yup from 'yup';

export default class LoginPage extends Component {
  render() {
    const {navigation} = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.loginArea}>
          <Formik
            validationSchema={yup.object().shape({
              email: yup
                .string()
                .email('Email Adresini Giriniz.')
                .required('Email Adresi Zorunlu'),
              password: yup
                .string()
                .min(5, ({min}) => `Minimim ${min} Harf Giriniz.`)
                .required('Şifre Zorunlu'),
            })}
            initialValues={{email: '', password: ''}}
            onSubmit={values => console.log(values)}>
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              isValid,
            }) => (
              <View>
                <TextInput
                  placeholder="E-posta"
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  style={styles.textInput}
                  keyboardType="email-address"
                />
                {errors.email && (
                  <Text style={styles.errors}>{errors.email}</Text>
                )}
                <TextInput
                  style={styles.textInput}
                  placeholder="Şifre"
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  secureTextEntry={true}
                />
                {errors.password && (
                  <Text style={styles.errors}>{errors.password}</Text>
                )}
                <TouchableOpacity
                  disabled={!isValid}
                  onPress={handleSubmit}
                  style={styles.girisYapSubmit}>
                  <Text style={styles.submidText}>Giriş Yap</Text>
                </TouchableOpacity>
              </View>
            )}
          </Formik>
          <View style={styles.registerArea}>
            <Text>Hesabınız yok mu?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={styles.registerText}> Hesap Oluştur.</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  registerArea: {
    justifyContent: 'flex-end',
    marginTop: 10,
    flexDirection: 'row',
  },
  registerText: {color: 'orange'},
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    borderRadius: 10,
    borderColor: '#000',
    marginTop: 15,
    backgroundColor: 'white',
    borderWidth: StyleSheet.hairlineWidth,
  },
  loginArea: {width: '80%'},
  errors: {fontSize: 10, color: 'red', marginTop: 5},
  girisYapSubmit: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0CD302',
    borderColor: '#0CD302',
    height: 40,
    marginTop: 25,
    borderWidth: 2,
    borderRadius: 5,
  },
  submidText: {color: '#fff', fontSize: 20},
});
