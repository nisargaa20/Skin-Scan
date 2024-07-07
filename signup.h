#ifndef SIGNUP_H
#define SIGNUP_H

#include <QWidget>
#include <QLineEdit>
#include <QPushButton>
#include <QVBoxLayout>

class Signup : public QWidget {
    Q_OBJECT

public:
    Signup(QWidget *parent = nullptr);

private slots:
    void handleSignup();

private:
    QLineEdit *usernameLineEdit;
    QLineEdit *passwordLineEdit;
    QLineEdit *confirmPasswordLineEdit;
    QPushButton *signupButton;
};

#endif // SIGNUP_H
