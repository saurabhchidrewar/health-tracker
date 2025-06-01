class User {
  final String? name;
  final String phone;
  final String? email;
  final String? bloodGroup;
  final int? age;

  User({this.name, required this.phone, this.email, this.bloodGroup, this.age});

  factory User.fromJson(Map<String, dynamic> json) {
    return User(
      name: json['name'] as String?,
      phone: json['phone'] as String,
      email: json['email'] as String?,
      bloodGroup: json['bloodGroup'] as String?,
      age: json['age'] as int?,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'name': name,
      'phone': phone,
      'email': email,
      'bloodGroup': bloodGroup,
      'age': age,
    };
  }

  User copyWith({
    String? name,
    String? phone,
    String? email,
    String? bloodGroup,
    int? age,
  }) {
    return User(
      name: name ?? this.name,
      phone: phone ?? this.phone,
      email: email ?? this.email,
      bloodGroup: bloodGroup ?? this.bloodGroup,
      age: age ?? this.age,
    );
  }
}
