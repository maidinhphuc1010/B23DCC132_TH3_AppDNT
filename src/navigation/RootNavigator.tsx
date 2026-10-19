import React from 'react';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import type { NavigatorScreenParams } from '@react-navigation/native';
import { MainTabNavigator } from './MainTabNavigator';
import type { MainTabParamList } from './MainTabNavigator';
import {
  StudentProfileScreen,
  SubjectDetailScreen,
  StudySessionDetailScreen,
  AssignmentDetailScreen,
  AcademicResultDetailScreen,
} from '../screens/LearningScreens';
import { theme } from '../theme';

export type RootStackParamList = {
  MainTabs: NavigatorScreenParams<MainTabParamList> | undefined;
  StudentProfile: undefined;
  /** Pass only the stable ID; resolve current subject data from LearningContext. */
  SubjectDetail: { subjectId: string };
  /** Pass only the stable ID; resolve current session data from LearningContext. */
  StudySessionDetail: { studySessionId: string };
  /** Pass only the stable ID; resolve current assignment data from LearningContext. */
  AssignmentDetail: { assignmentId: string };
  /** Pass only the stable ID; resolve current result data from LearningContext. */
  AcademicResultDetail: { academicResultId: string };
};

export type RootStackScreenProps<RouteName extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, RouteName>;

export type SubjectDetailScreenProps = RootStackScreenProps<'SubjectDetail'>;
export type StudySessionDetailScreenProps =
  RootStackScreenProps<'StudySessionDetail'>;
export type AssignmentDetailScreenProps =
  RootStackScreenProps<'AssignmentDetail'>;
export type AcademicResultDetailScreenProps =
  RootStackScreenProps<'AcademicResultDetail'>;

const Stack = createNativeStackNavigator<RootStackParamList>();
const navigationTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: theme.colors.primary,
    background: theme.colors.background,
    card: theme.colors.surface,
    text: theme.colors.text,
    border: theme.colors.border,
  },
};

export function RootNavigator() {
  return (
    <NavigationContainer theme={navigationTheme}>
      <Stack.Navigator
        initialRouteName="MainTabs"
        screenOptions={{
          headerTintColor: theme.colors.primary,
          headerStyle: { backgroundColor: theme.colors.surface },
          contentStyle: { backgroundColor: theme.colors.background },
        }}
      >
        <Stack.Screen
          name="MainTabs"
          component={MainTabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SubjectDetail"
          component={SubjectDetailScreen}
          options={{ title: 'Chi tiết môn học' }}
        />
        <Stack.Screen
          name="StudySessionDetail"
          component={StudySessionDetailScreen}
          options={{ title: 'Chi tiết buổi học' }}
        />
        <Stack.Screen
          name="AssignmentDetail"
          component={AssignmentDetailScreen}
          options={{ title: 'Chi tiết bài tập' }}
        />
        <Stack.Screen
          name="AcademicResultDetail"
          component={AcademicResultDetailScreen}
          options={{ title: 'Chi tiết kết quả' }}
        />
        <Stack.Screen
          name="StudentProfile"
          component={StudentProfileScreen}
          options={{ title: 'Hồ sơ sinh viên' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
