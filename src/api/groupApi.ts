// src/api/groupApi.ts
import axiosInstance from './axiosInstance';
import { GroupPagingQuery, GroupListItem, GroupJoinResponse } from '../types/groupTypes';


/* =========================
 * APIs
 * ========================= */

/**
 * 전체 그룹 조회
 * GET /group
 *
 * @param query 페이지 파라미터
 */
export const getGroups = async (
    query: GroupPagingQuery = {}
): Promise<GroupListItem[]> => {
    const { data } = await axiosInstance.get<GroupListItem[]>('/group', {
        params: {
            pageNumber: query.pageNumber ?? 0,
            pageSize: query.pageSize ?? 10,
        },
    });
    return data;
};

/**
 * 그룹 참여
 * PATCH /group/{groupId}
 *
 * @param groupId 참여할 그룹 UUID
 * @returns { chatroomId, joinedMemberName, joinedMemberImage }
 */
export const joinGroup = async (groupId: string): Promise<GroupJoinResponse> => {
    const { data } = await axiosInstance.patch<GroupJoinResponse>(`/group/${groupId}`);
    return data;
};

export default {
    getGroups,
    joinGroup,
};
