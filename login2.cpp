#include "login.h"
#include <QMessageBox>

Login::Login(QWidget *parent) : QWidget(parent) {
    QVBoxLayout *layout = new QVBoxLayout(this);

    usernameLineEdit = new QLineEdit(this);
    usernameLineEdit->setPlaceholderText("Username");
    
    passwordLineEdit = new QLineEdit(this);
    passwordLineEdit->setPlaceholderText("Password");
    passwordLineEdit->setEchoMode(QLineEdit::Password);
    
    loginButton = new QPushButton("Login", this);
    signupButton = new QPushButton("Signup", this);
    
    layout->addWidget(usernameLineEdit);
    layout->addWidget(passwordLineEdit);
    layout->addWidget(loginButton);
    layout->addWidget(signupButton);

    connect(loginButton, &QPushButton::clicked, this, &Login::handleLogin);
    connect(signupButton, &QPushButton::clicked, this, &Login::showSignup);

    setLayout(layout);
}

void Login::handleLogin() {
    QString username = usernameLineEdit->text();
    QString password = passwordLineEdit->text();
    
    // Here you would check the credentials
    if (username == "user" && password == "pass") {
        QMessageBox::information(this, "Login", "Login successful!");
    } else {
        QMessageBox::warning(this, "Login", "Username or password incorrect.");
    }
}

void Login::showSignup() {
    Signup *signupWindow = new Signup();
    signupWindow->show();
    this->close();
}
