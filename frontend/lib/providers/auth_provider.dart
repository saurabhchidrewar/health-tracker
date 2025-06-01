import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:riverpod_annotation/riverpod_annotation.dart';
import '../models/user.model.dart';
import '../services/api_service.dart';

part 'auth_provider.g.dart';

@riverpod
class Auth extends _$Auth {
  @override
  FutureOr<User?> build() {
    return null;
  }

  Future<void> sendOtp(String phone) async {
    state = const AsyncLoading();
    state = await AsyncValue.guard(() async {
      await ref.read(apiServiceProvider).sendOtp(phone);
      return null;
    });
  }

  Future<void> verifyOtp(String phone, String otp) async {
    state = const AsyncLoading();
    state = await AsyncValue.guard(() async {
      final user = await ref.read(apiServiceProvider).verifyOtp(phone, otp);
      return user;
    });
  }

  void logout() {
    state = const AsyncData(null);
  }
}

@riverpod
ApiService apiService(ApiServiceRef ref) {
  return ApiService();
}
