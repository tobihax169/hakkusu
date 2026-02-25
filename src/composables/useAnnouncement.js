import { ref } from 'vue';

const announcementText = ref(localStorage.getItem('global_announcement') || '');

if (typeof window !== 'undefined') {
    window.addEventListener('storage', (event) => {
        if (event.key === 'global_announcement') {
            announcementText.value = event.newValue || '';
        }
    });
}

export const useAnnouncement = () => {
    const setAnnouncement = (text) => {
        announcementText.value = text;
        localStorage.setItem('global_announcement', text);
    };

    return { announcementText, setAnnouncement };
};
