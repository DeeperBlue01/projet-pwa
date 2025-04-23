# projet-pwa

- name: Write Maven settings.xml from secret
  run: echo "${{ secrets.MAVEN_SETTINGS_XML }}" > ${{ runner.temp }}/settings.xml

- name: Build and test with custom settings.xml
  run: |
    mvn -U clean install --settings ${{ runner.temp }}/settings.xml -Dmaven.test.skip=${{ inputs.skip-tests }}
  working-directory: ${{ env.MAVEN_BASE_DIRECTORY }}
