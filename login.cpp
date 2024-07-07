#ifndef LOGIN_H
#define LOGIN_H

#include <QWidget>
#include <QLineEdit>
#include <QPushButton>
#include <QVBoxLayout>
#include "signup.h"

class Login : public QWidget {
    Q_OBJECT

public:
    Login(QWidget *parent = nullptr);

private slots:
    void handleLogin();
    void showSignup();

private:
    QLineEdit *usernameLineEdit;
    QLineEdit *passwordLineEdit;
    QPushButton *loginButton;
    QPushButton *signupButton;
};

#endif // LOGIN_H
