import { useState } from "react";
import api from "../utils/axios";

export const useMeeting = () => {
  const getAllMeetings = async () => {
    try {
      const response = await api.get("/meetings");
      const events = response.data.map((meeting) => ({
        id: meeting._id,
        title: meeting.title,
        start: meeting.start,
        end: meeting.end,
        allDay: meeting.allDay,
      }));
    } catch (error) {
      console.error(error);
    }
  };

  const deleteMeeting = async (meetId) => {
    try {
      const response = await api.delete(`/meetings/${meetId}`);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const createMeeting = async (meeting, userId) => {
    try {
      const mentorResponse = await api.get(`/mentors/${userId}`);
      const mentor = mentorResponse.data.mentor;
      meeting.recipients = [mentor, userId];

      const response = await api.post("/meetings", meeting);

      const notification = {
        userId,
        title: meeting.title,
        description: meeting.type,
        type: "meeting",
      };
      const notificationResponse = await api.post(
        "/notifications",
        notification
      );
      console.log(notificationResponse.data);
      return response;
    } catch (error) {
      console.error(error);
    }
  };

  return {
    createMeeting,
    getAllMeetings,
    deleteMeeting,
  };
};
