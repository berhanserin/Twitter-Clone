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
import {gql, useMutation} from '@apollo/client';

export default class RegisterPage extends Component {
  render() {
    const {navigation} = this.props;
    const register = gql`
      mutation (
        $uname: String!
        $email: String!
        $password: String!
        $confirmPass: String!
      ) {
        uyeOl(
          kullaniciAd: $uname
          email: $email
          parola: $password
          parolaKontrol: $confirmPass
        )
      }
    `;
    return (
      <View style={styles.container}>
        <View style={styles.loginArea}>
          <Formik
            validationSchema={yup.object().shape({
              uname: yup
                .string()
                .min(5, ({min}) => `Minimum ${min} Harf Giriniz.`)
                .required('Kullanıcı Adı Zorunlu'),
              email: yup
                .string()
                .email('Email Adresini Giriniz.')
                .required('Email Adresi Zorunlu'),
              password: yup
                .string()
                .min(5, ({min}) => `Minimim ${min} Harf Giriniz.`)
                .required('Şifre Zorunlu'),
              confirmPassword: yup
                .string()
                .oneOf([yup.ref('password'), null], 'Şifre eşdeğer değil')
                .required('Şifre eşdeğer değil'),
            })}
            initialValues={{
              email: '',
              password: '',
              confirmPassword: '',
              uname: '',
            }}
            onSubmit={values => {
              const {loading, error, data} = useMutation(register, {
                variables: {
                  uname: values.uname,
                  email: values.email,
                  password: values.password,
                  confirmPass: values.confirmPassword,
                },
              });
            }}>
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
                  placeholder="Kullanıcı Adı"
                  onChangeText={handleChange('uname')}
                  onBlur={handleBlur('uname')}
                  value={values.uname}
                  style={styles.textInput}
                />
                {errors.uname && (
                  <Text style={styles.errors}>{errors.uname}</Text>
                )}
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
                <TextInput
                  style={styles.textInput}
                  placeholder="Şifre Tekrar"
                  onChangeText={handleChange('confirmPassword')}
                  onBlur={handleBlur('confirmPassword')}
                  value={values.confirmPassword}
                  secureTextEntry={true}
                />
                {errors.confirmPassword && (
                  <Text style={styles.errors}>{errors.confirmPassword}</Text>
                )}
                <TouchableOpacity
                  onPress={handleSubmit}
                  style={styles.girisYapSubmit}>
                  <Text style={styles.submidText}>Kayıt Ol</Text>
                </TouchableOpacity>
              </View>
            )}
          </Formik>
          <View style={styles.registerArea}>
            <Text>Hesabınız var mı? </Text>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={styles.registerText}>Hesaba giriş yap</Text>
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
