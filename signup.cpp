#include "signup.h"
#include <QMessageBox>

Signup::Signup(QWidget *parent) : QWidget(parent) {
    QVBoxLayout *layout = new QVBoxLayout(this);

    usernameLineEdit = new QLineEdit(this);
    usernameLineEdit->setPlaceholderText("Username");
    
    passwordLineEdit = new QLineEdit(this);
    passwordLineEdit->setPlaceholderText("Password");
    passwordLineEdit->setEchoMode(QLineEdit::Password);
    
    confirmPasswordLineEdit = new QLineEdit(this);
    confirmPasswordLineEdit->setPlaceholderText("Confirm Password");
    confirmPasswordLineEdit->setEchoMode(QLineEdit::Password);
    
    signupButton = new QPushButton("Signup", this);
    
    layout->addWidget(usernameLineEdit);
    layout->addWidget(passwordLineEdit);
    layout->addWidget(confirmPasswordLineEdit);
    layout->addWidget(signupButton);

    connect(signupButton, &QPushButton::clicked, this, &Signup::handleSignup);

    setLayout(layout);
}

void Signup::handleSignup() {
    QString username = usernameLineEdit->text();
    QString password = passwordLineEdit->text();
    QString confirmPassword = confirmPasswordLineEdit->text();
    
    if (password != confirmPassword) {
        QMessageBox::warning(this, "Signup", "Passwords do not match.");
    } else {
        // Here you would handle the signup logic
        QMessageBox::information(this, "Signup", "Signup successful!");
    }
}
