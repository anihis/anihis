//TODO: move this TS to core data access lib?
import { HubConnection, IStreamResult } from '@microsoft/signalr';

export class EventsHub {
  constructor(private connection: HubConnection) {}

  registerCallbacks(implementation: IEventsHubCallbacks) {
    this.connection.on('MessageCreated', (model) =>
      implementation.messageCreated(model)
    );
    this.connection.on('UndeliveredMessageCreated', (model) =>
      implementation.undeliveredMessageCreated(model)
    );
    this.connection.on('UserConnectionReestablished', (model) =>
      implementation.userConnectionReestablished(model)
    );
    this.connection.on('MessageDeleted', (model) =>
      implementation.messageDeleted(model)
    );
    this.connection.on('MessageRead', (model) =>
      implementation.messageRead(model)
    );
    this.connection.on('UserConnectionStatusChanged', (model) =>
      implementation.userConnectionStatusChanged(model)
    );
    this.connection.on('UserJoinedGroup', (model) =>
      implementation.userJoinedGroup(model)
    );
    this.connection.on('UserLeftGroup', (model) =>
      implementation.userLeftGroup(model)
    );
    this.connection.on('UserKickedFromGroup', (model) =>
      implementation.userKickedFromGroup(model)
    );
    this.connection.on('WorkoutSubmitted', (model) =>
      implementation.workoutSubmitted(model)
    );
    this.connection.on('NotificationCreated', (model) =>
      implementation.notificationCreated(model)
    );
    this.connection.on('GroupMessageCountsChanged', (model) =>
      implementation.groupMessageCountsChanged(model)
    );
    this.connection.on('NotificationCountsChanged', (model) =>
      implementation.notificationCountsChanged(model)
    );
  }

  unregisterCallbacks(implementation: IEventsHubCallbacks) {
    this.connection.off('MessageCreated', (model) =>
      implementation.messageCreated(model)
    );
    this.connection.off('UndeliveredMessageCreated', (model) =>
      implementation.undeliveredMessageCreated(model)
    );
    this.connection.off('UserConnectionReestablished', (model) =>
      implementation.userConnectionReestablished(model)
    );
    this.connection.off('MessageDeleted', (model) =>
      implementation.messageDeleted(model)
    );
    this.connection.off('MessageRead', (model) =>
      implementation.messageRead(model)
    );
    this.connection.off('UserConnectionStatusChanged', (model) =>
      implementation.userConnectionStatusChanged(model)
    );
    this.connection.off('UserJoinedGroup', (model) =>
      implementation.userJoinedGroup(model)
    );
    this.connection.off('UserLeftGroup', (model) =>
      implementation.userLeftGroup(model)
    );
    this.connection.off('UserKickedFromGroup', (model) =>
      implementation.userKickedFromGroup(model)
    );
    this.connection.off('WorkoutSubmitted', (model) =>
      implementation.workoutSubmitted(model)
    );
    this.connection.off('NotificationCreated', (model) =>
      implementation.notificationCreated(model)
    );
    this.connection.off('GroupMessageCountsChanged', (model) =>
      implementation.groupMessageCountsChanged(model)
    );
    this.connection.off('NotificationCountsChanged', (model) =>
      implementation.notificationCountsChanged(model)
    );
  }
}

export interface IEventsHubCallbacks {
  messageCreated(model: UserMessageModel): void;
  undeliveredMessageCreated(model: UndeliveredMessageCreatedEvent): void;
  userConnectionReestablished(model: UserConnectionReestablishedEvent): void;
  messageDeleted(model: MessageEventModel): void;
  messageRead(model: MessageEventModel): void;
  userConnectionStatusChanged(model: UserConnectionStatusChangedEvent): void;
  userJoinedGroup(model: GroupEventModel): void;
  userLeftGroup(model: GroupEventModel): void;
  userKickedFromGroup(model: UserKickedFromGroupEvent): void;
  workoutSubmitted(model: WorkoutEvent): void;
  notificationCreated(model: NotificationCreatedEvent): void;
  groupMessageCountsChanged(model: GroupMessageCountsChangedEvent): void;
  notificationCountsChanged(model: NotificationCountsChangedEvent): void;
}

export interface UserConnectionReestablishedEvent {
  userUid: string | undefined;
  groupUid: string | undefined;
  status: ConnectionStatusType | undefined;
}

export interface UndeliveredMessageCreatedEvent {
  model: UserMessageModel;
  groupUid: string | undefined;
  userUid: string | undefined;
  data: string | undefined;
}

export interface UserMessageModel {
  uid: string | undefined;
  messageStatusType: MessageStatusType;
  message: MessageModel | undefined;
  replyToMessage: MessageModel | undefined;
}

export enum MessageStatusType {
  Unknown = 0,
  New = 1,
  Read = 2,
}

export interface MessageModel {
  uid: string | undefined;
  text: string | undefined;
  senderRole: RoleType;
  createdDateTimeUTC: string;
  userWorkoutUid: string | undefined;
  senderUser: MessageSenderModel | undefined;
  groupUid: string | undefined;
}

export enum RoleType {
  Unknown = 'Unknown',
  Coach = 'Coach',
  CustomClient = 'CustomClient',
  PremiumClient = 'PremiumClient',
  System = 'System',
  FreemiumClient = 'FreemiumClient',
}

export interface MessageSenderModel {
  uid: string | undefined;
  firstName: string | undefined;
  lastName: string | undefined;
  role: RoleType;
  connectionStatusType: ConnectionStatusType | undefined;
}

export enum ConnectionStatusType {
  Unknown = 'Unknown',
  Offline = 'Offline',
  Online = 'Online',
}

export interface MessageEventModel {
  groupUid: string | undefined;
  messageUid: string | undefined;
}

export interface UserConnectionStatusChangedEvent {
  userUid: string | undefined;
  status: ConnectionStatusType;
}

export interface GroupEventModel {
  messageUid: string | undefined;
  groupUid: string | undefined;
  text: string | undefined;
}

export interface WorkoutEvent {
  userFirstName: string | undefined;
  userLastName: string | undefined;
  userUid: string | undefined;
  userWorkoutUid: string | undefined;
  notificationUid: string | undefined;
  messageUid: string | undefined;
  groupUid: string | undefined;
  text: string | undefined;
  createdDateTimeUTC: Date;
}

export interface NotificationCreatedEvent {
  uid: string | undefined;
  coachUid: string | undefined;
  clientUid: string | undefined;
  clientFirstName: string | undefined;
  clientLastName: string | undefined;
  createdDateTimeUTC: string;
  type: NotificationType;
  payload: NotificationPayload | undefined;
  payloadJson: string | undefined;
}

export enum NotificationType {
  Unknown = 'Unknown',
  WorkoutMissed = 'WorkoutMissed',
  WorkoutMoved = 'WorkoutMoved',
  MessageCreated = 'MessageCreated',
  ReflectionSubmissionReminder = 'ReflectionSubmissionReminder',
}

export interface NotificationPayload {
  groupUid: string | undefined;
  messageUid: string | undefined;
  userWorkoutUid: string | undefined;
  workoutName: string | undefined;
}

export interface GroupMessageCountsChangedEvent {
  userUid: string | undefined;
  groupUid: string | undefined;
  groupUnreadCount: number;
  totalUnreadCount: number;
}

export interface NotificationCountsChangedEvent {
  userUid: string | undefined;
  unreadCount: number;
}

export interface UserKickedFromGroupEvent {
  model: GroupEventModel | undefined;
  userUid: string | undefined;
}
