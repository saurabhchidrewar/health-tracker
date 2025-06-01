import 'dart:convert';
import 'package:http/http.dart' as http;
import '../models/user.model.dart';

class ApiService {
  static const String baseUrl = 'http://localhost:3000/api';

  // Send OTP
  Future<void> sendOtp(String phone) async {
    final response = await http.post(
      Uri.parse('$baseUrl/auth/send-otp'),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({'phone': phone}),
    );

    if (response.statusCode != 200) {
      throw Exception('Failed to send OTP');
    }
  }

  // Verify OTP
  Future<User> verifyOtp(String phone, String otp) async {
    final response = await http.post(
      Uri.parse('$baseUrl/auth/verify-otp'),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({'phone': phone, 'otp': otp}),
    );

    if (response.statusCode != 200) {
      throw Exception('Invalid OTP');
    }

    return User.fromJson(jsonDecode(response.body));
  }

  // Get user profile
  Future<User> getUserProfile(String phone) async {
    final response = await http.get(
      Uri.parse('$baseUrl/users/phone/$phone'),
      headers: {'Content-Type': 'application/json'},
    );

    if (response.statusCode != 200) {
      throw Exception('Failed to get user profile');
    }

    return User.fromJson(jsonDecode(response.body));
  }

  // Update user profile
  Future<User> updateUserProfile(int userId, Map<String, dynamic> data) async {
    final response = await http.put(
      Uri.parse('$baseUrl/users/$userId'),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode(data),
    );

    if (response.statusCode != 200) {
      throw Exception('Failed to update user profile');
    }

    return User.fromJson(jsonDecode(response.body));
  }
}
