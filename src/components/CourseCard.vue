<template>
  <div class="course-wrapper">
    <div class="course-content">
      <router-link :to="'quiz/'+course.id" class="course-title">
        {{courseTitleFormatted}}
      </router-link>
      <router-link :to="'quiz/'+course.id">
        <div class="course-container" ref="courseContainer" :style="cardStyle"></div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CourseCard',
  props: ['course'],
  data() {
    return {
      cardStyle: {
        'background-image': this.course.cover ? 'url(' + '"' +  this.course.cover + '"' + ')': 'url(' + "https://rails-quiz.s3.amazonaws.com/courseCoverDefaultImage.jpeg" + ')',
        'background-position': 'center',
        'background-repeat': 'no-repeat',
        'background-size': 'cover'
      },
      courseTitleFormatted:this.course.title.length >= 17 ?this.course.title.substring(0,14)+'...': this.course.title
    }
  }
}
</script>
<style scoped>


@media (min-width: 576px) {
  .course-wrapper {
    margin-bottom: 1rem;
  }

  .course-container {
    height: 40rem;
    width: 40rem;
  }

  .course-content {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .course-title {
    color:white;
    font-size:3rem;
    text-decoration: none;
  }
  .course-title:hover{
    text-decoration: underline;
  }
}
/* Large devices (desktops, 992px and up) */
@media (min-width: 992px) {
  .course-wrapper {
    height: 100px;
  }

  .course-container {
    width: 250px;
    height: 250px;
  }

  .course-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }

  .course-title {
    color:white;
    font-size:2rem;
    text-decoration: none;
  }
  .course-title:hover{
    text-decoration: underline;
  }
}
</style>
