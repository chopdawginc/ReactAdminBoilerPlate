/**** Enums ****/
enum ESongStatus {
  Active = "Active",
  Inactive = "Inactive",
}

enum EProfileDesiredOutcome {
  SleepBetter = "Sleep Better",
  ThinkLess = "Think Less",
  LoseWeight = "Lose Weight",
  GainClarity = "Gain Clarity",
  FeelEnergized = "Feel Energized",
  MorePeace = "More Peace",
  TrainingRegularly = "Training Regularly",
}

enum EProfileCommitment {
  OneToTwoPerWeek = "1-2x per week",
  TwoToFourPerWeek = "2-4x per week",
  Everyday = "Everyday",
}

enum EProfileExerciseType {
  Walking = "Walking",
  Running = "Running",
}

enum EProfilePace {
  EasyWalk = "Easy Walk", // Walking
  ModerateWalk = "Moderate Walk", // Walking

  TwelveMinutePerMile = "12 minutes per mile", // Running
  TenMinutePerMile = "10 minutes per mile", // Running
  EightMinutePerMile = "8 minutes per mile", // Running
}

enum EProfileWavelength {
  StressLess = "Stress Less",
  FindFocus = "Find Focus",
  MoveMotivated = "Move Motivated",
}

enum EAppContentType {
  Legal = "Legal",
  Wavelength = "Wavelength",
}

enum EAppContentSubType {
  TC = "Terms and Conditions", // Legal
  PP = "Privacy Policy", // Legal
  MD = "Medical Disclaimer", // Legal

  StressLess = "Stress Less", // Wavelength
  FindFocus = "Find Focus", // Wavelength
  MoveMotivated = "Move Motivated", // Wavelength
}

enum EAdminRole {
  SuperAdmin = "Super Admin",
  Admin = "Admin",
}

export {
  ESongStatus,
  EProfileDesiredOutcome,
  EProfileCommitment,
  EProfileExerciseType,
  EProfilePace,
  EProfileWavelength,
  EAppContentType,
  EAppContentSubType,
  EAdminRole,
};
