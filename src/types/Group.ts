import { User } from './User';

export interface Group {
  id: string;
  name: string;
  description?: string;
  members: User[];
  createdBy: User;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateGroupRequest {
  name: string;
  description?: string;
  memberIds: string[];
}

export interface UpdateGroupRequest {
  name?: string;
  description?: string;
  memberIds?: string[];
}